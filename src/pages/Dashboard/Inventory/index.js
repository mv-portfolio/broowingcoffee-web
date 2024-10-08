import {useContext, useEffect, useState} from 'react';
import {View, Text, Button, Icon, SearchField, Dialog, Separator} from 'components';
import {ACCENT_COLOR, ACCENT_COLOR2} from 'constants/colors';
import {connect} from 'react-redux';
import {PrimaryDialog, SecondaryDialog, Toast} from 'context';
import ItemList from './components/ItemList';
import DiscountList from './components/DiscountList';
import styles from './.module.css';
import Restock from './modals/Restock';
import Item from './modals/Item';
import {
  CLEAR_ERROR,
  POP_DISCOUNT,
  POP_INVENTORY_REQ,
  PUSH_DISCOUNT_REQ,
  PUSH_INVENTORY_REQ,
  SET_INDEX_DISCOUNTS_REQ,
  SET_INDEX_INVENTORY_REQ,
  SET_RESTOCK_INVENTORY_REQ,
} from 'ducks/actions';
import Discount from './modals/Discount';
import {DESC_DATE_MODIFIED} from 'utils/helper';
import Formatter from 'utils/Formatter';

function Inventory({
  dispatch,
  inventory: reduxInventory,
  discounts: reduxDiscounts,
  loading,
  error,
}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowSecondaryDialog, onHide: onHideSecondaryDialog} =
    useContext(SecondaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [inventory, setInventory] = useState(reduxInventory.items || []);
  const [discounts, setDiscounts] = useState(reduxDiscounts.discounts || []);
  const [searchItems, setSearchItems] = useState('');
  const [searchDiscount, setSearchDiscount] = useState('');

  const onSearch = (array, setArray, value) => {
    let filtered = [];
    if (value.length !== 0) {
      filtered = array.filter(item => item.name.includes(value));
      setArray(filtered);
      return;
    }
    setArray(array);
  };
  const onShowItemDialog = ({type, productInfo, onAdd, onUpdate, onDelete}) => {
    onShowPrimaryDialog(
      <Item
        type={type}
        productInfo={productInfo}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={onHidePrimaryDialog}
      />,
    );
  };
  const onShowDiscountsDialog = ({type, discount, onAdd, onUpdate, onDelete}) => {
    onShowPrimaryDialog(
      <Discount
        type={type}
        discount={discount}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCancel={onHidePrimaryDialog}
      />,
    );
  };
  const onShowConditionalDialog = ({
    title,
    content,
    positiveText,
    onClickPositive,
    positiveButtonStyle,
  }) => {
    onShowSecondaryDialog(
      <Dialog
        title={title}
        content={content}
        positiveButtonStyle={positiveButtonStyle}
        positiveText={positiveText || 'Yes'}
        onClickPositive={onClickPositive}
        negativeText='No'
        onClickNegative={onHideSecondaryDialog}
      />,
    );
  };

  const onChange = (actionType, value) => {
    if (actionType === 'on-change-search-items') {
      setSearchItems(value);
      onSearch(reduxInventory.items, setInventory, value);
      return;
    }
    if (actionType === 'on-change-search-discounts') {
      setSearchDiscount(value);
      onSearch(reduxDiscounts.discounts, setDiscounts, value);
      return;
    }
  };
  const onClick = (actionType, value) => {
    //show-dialog
    if (actionType === 'on-click-add-item-dialog') {
      onShowItemDialog({
        type: 'add',
        onAdd: item => onClick('on-click-add-item', item),
      });
      return;
    }
    if (actionType === 'on-click-edit-item-dialog') {
      onShowItemDialog({
        type: 'edit',
        productInfo: value,
        onUpdate: item => onClick('on-click-update-item', item),
        onDelete: item => onClick('on-click-delete-item', item),
      });
      return;
    }
    if (actionType === 'on-click-restock-item-dialog') {
      onShowPrimaryDialog(
        <Dialog
          title={`Restock`}
          content='Are you sure this is the same item?'
          positiveText='Yes'
          onClickPositive={() => {
            onShowPrimaryDialog(
              <Restock
                item={value}
                onRestock={item => onClick('on-click-restock-item', item)}
                onCancel={onHidePrimaryDialog}
              />,
            );
          }}
          negativeText='No'
          onClickNegative={() => {
            onShowItemDialog({
              type: 'add',
              onAdd: item => onClick('on-click-add-item', item),
              onClickPerishableProperty: () =>
                onClick('on-click-add-item-perishable-props'),
            });
          }}
          neutralText='Cancel'
          onClickNeutral={onHidePrimaryDialog}
        />,
      );
    }
    if (actionType === 'on-click-add-discounts-dialog') {
      onShowDiscountsDialog({
        type: 'add',
        onAdd: discount => onClick('on-click-add-discount', discount),
      });
    }
    if (actionType === 'on-click-edit-discounts-dialog') {
      onShowDiscountsDialog({
        type: 'edit',
        discount: value,
        onAdd: discount => onClick('on-click-add-discount', discount),
        onUpdate: discount => onClick('on-click-update-discount', discount),
        onDelete: discount => onClick('on-click-delete-discount', discount),
      });
    }

    //CRUD
    //item
    if (actionType === 'on-click-add-item') {
      onShowConditionalDialog({
        title: 'Add Item',
        content: `Make sure all inputs and perishable properties are double checked. Do you want to proceed?`,
        onClickPositive: () => dispatch(PUSH_INVENTORY_REQ({item: value})),
      });
      return;
    }
    if (actionType === 'on-click-update-item') {
      onShowConditionalDialog({
        title: 'Update Item',
        content: `Make sure all inputs and perishable properties are double checked. Do you want to proceed?`,
        onClickPositive: () => dispatch(SET_INDEX_INVENTORY_REQ({item: value})),
      });
      return;
    }
    if (actionType === 'on-click-delete-item') {
      onShowConditionalDialog({
        title: 'Delete',
        content: `Do you want to delete ${Formatter.toName(value.name)}?`,
        positiveText: 'Delete',
        onClickPositive: () => {
          dispatch(POP_INVENTORY_REQ({item: value}));
          setSearchItems('');
        },
        positiveButtonStyle: {backgroundColor: ACCENT_COLOR2},
      });
      return;
    }
    if (actionType === 'on-click-restock-item') {
      onShowConditionalDialog({
        title: 'Restock Item',
        content: `do you want proceed?`,
        onClickPositive: () => dispatch(SET_RESTOCK_INVENTORY_REQ({item: value})),
      });
      return;
    }
    //discount
    if (actionType === 'on-click-add-discount') {
      dispatch(PUSH_DISCOUNT_REQ({discount: value}));
      return;
    }
    if (actionType === 'on-click-update-discount') {
      dispatch(SET_INDEX_DISCOUNTS_REQ({discount: value}));
      return;
    }
    if (actionType === 'on-click-delete-discount') {
      onShowConditionalDialog({
        title: 'Delete',
        content: `Do you want to delete this discount`,
        positiveText: 'Delete',
        onClickPositive: () => {
          dispatch(POP_DISCOUNT({discount: value}));
          onHidePrimaryDialog();
        },
        positiveButtonStyle: {backgroundColor: ACCENT_COLOR2},
      });
      return;
    }
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Inventory';
  };
  const inventoryListener = () => {
    setInventory(reduxInventory.items);
  };
  const discountsListener = () => {
    setDiscounts(reduxDiscounts.discounts);
  };
  const successListener = () => {
    if (
      !loading.status &&
      (loading.message.includes('push-discounts-resolve') ||
        loading.message.includes('set-discounts-resolve') ||
        loading.message.includes('pop-discounts-resolve') ||
        loading.message.includes('push-item-resolve') ||
        loading.message.includes('set-item-resolve') ||
        loading.message.includes('pop-item-resolve'))
    ) {
      onHidePrimaryDialog();
      onHideSecondaryDialog();
    }
  };
  const errorListener = () => {
    if (error.inventory) {
      onHideSecondaryDialog();
      onShowToast(error.inventory, 4000, () => {
        dispatch(CLEAR_ERROR());
      });
      return;
    }
    if (error.discount) {
      onHideSecondaryDialog();
      onShowToast(error.discount, 4000, () => {
        dispatch(CLEAR_ERROR());
      });
      return;
    }
  };
  useEffect(screenInitListener, [reduxInventory]);
  useEffect(inventoryListener, [reduxInventory]);
  useEffect(discountsListener, [reduxDiscounts]);
  useEffect(successListener, [loading]);
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.headerBodyPane}>
          <Text style={styles.label}>Items</Text>
          <View style={styles.headerRightPane}>
            <SearchField
              placeholder='name'
              value={searchItems}
              onChangeText={text => onChange('on-change-search-items', text)}
            />
            <Separator horizontal={0.75} />
            <Button
              skin={styles.buttonAdd}
              onPress={() => onClick('on-click-add-item-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='2.25vh' />
            </Button>
          </View>
        </View>
        <ItemList
          items={inventory.sort(DESC_DATE_MODIFIED)}
          onEdit={item => onClick('on-click-edit-item-dialog', item)}
          onRestock={item => onClick('on-click-restock-item-dialog', item)}
        />
        <Separator vertical={1} />
        <View style={styles.headerBodyPane}>
          <Text style={styles.label}>Discounts</Text>
          <View style={styles.headerRightPane}>
            <SearchField
              placeholder='name'
              value={searchDiscount}
              onChangeText={text => onChange('on-change-search-discounts', text)}
            />
            <Separator horizontal={0.75} />
            <Button
              skin={styles.buttonAdd}
              onPress={() => onClick('on-click-add-discounts-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='2.25vh' />
            </Button>
          </View>
        </View>
        <DiscountList
          discounts={discounts.sort(function (a, b) {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
          })}
          onEdit={discount => onClick('on-click-edit-discounts-dialog', discount)}
        />
      </View>
    </View>
  );
}

const stateProps = ({loading, inventory, discounts, error}) => ({
  loading,
  inventory,
  discounts,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Inventory);
