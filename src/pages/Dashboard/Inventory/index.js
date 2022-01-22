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
  POP_INVENTORY,
  PUSH_DISCOUNT_REQ,
  PUSH_INVENTORY_REQ,
  SET_INDEX_DISCOUNTS_REQ,
  SET_INDEX_INVENTORY_REQ,
  SET_RESTOCK_INVENTORY_REQ,
} from 'ducks/actions';
import Discount from './modals/Discount';
import {ASC_DATE} from 'utils/helper';
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
  const onShowConditionalDeleteDialog = ({title, content, onClickPositive}) => {
    onShowSecondaryDialog(
      <Dialog
        title={title}
        content={content}
        positiveButtonStyle={{BACKGROUND_COLOR2: ACCENT_COLOR2}}
        positiveText='Yes'
        onClickPositive={onClickPositive}
        negativeText='No'
        onClickNegative={onHideSecondaryDialog}
      />,
    );
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
          title={`${value.name} (${value.brand})`}
          content='are you sure this is the same item?'
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
      onShowConditionalDeleteDialog({
        title: 'Add',
        content: `make sure all inputs and perishable property are double check, do you want to proceed?`,
        onClickPositive: () => onClick('on-click-add-item-dialog-positive', value),
      });
      return;
    }
    if (actionType === 'on-click-update-item') {
      onShowConditionalDeleteDialog({
        title: 'Update',
        content: `make sure all inputs and perishable property are double check, do you want to proceed?`,
        onClickPositive: () => onClick('on-click-update-item-dialog-positive', value),
      });
      return;
    }
    if (actionType === 'on-click-delete-item') {
      onShowConditionalDeleteDialog({
        title: 'Delete',
        content: `Do you want to delete ${Formatter.toName(value.name)}?`,
        onClickPositive: () => onClick('on-click-delete-item-dialog-positive', value),
      });
      return;
    }
    if (actionType === 'on-click-restock-item') {
      dispatch(SET_RESTOCK_INVENTORY_REQ({item: value}));
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
      dispatch(POP_DISCOUNT({discount: value}));
      onHidePrimaryDialog();
      return;
    }

    //dialog
    if (actionType === 'on-click-add-item-dialog-positive') {
      dispatch(PUSH_INVENTORY_REQ({item: value}));
      return;
    }
    if (actionType === 'on-click-update-item-dialog-positive') {
      dispatch(SET_INDEX_INVENTORY_REQ({item: value}));
      return;
    }
    if (actionType === 'on-click-delete-item-dialog-positive') {
      dispatch(POP_INVENTORY({item: value}));
      setSearchItems('');
      return;
    }
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
      onShowToast(error.inventory, 4000, () => {
        dispatch(CLEAR_ERROR());
      });
      return;
    }
    if (error.discount) {
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
              placeholder='Name'
              value={searchItems}
              onChangeText={text => onChange('on-change-search-items', text)}
            />
            <Button
              skin={styles.buttonAdd}
              onPress={() => onClick('on-click-add-item-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='3vh' />
            </Button>
          </View>
        </View>
        <ItemList
          items={inventory.sort(ASC_DATE)}
          onEdit={item => onClick('on-click-edit-item-dialog', item)}
          onRestock={item => onClick('on-click-restock-item-dialog', item)}
        />
        <Separator vertical={1} />
        <View style={styles.headerBodyPane}>
          <Text style={styles.label}>Discounts</Text>
          <View style={styles.headerRightPane}>
            <SearchField
              placeholder='Name'
              value={searchDiscount}
              onChangeText={text => onChange('on-change-search-discounts', text)}
            />
            <Button
              skin={styles.buttonAdd}
              onPress={() => onClick('on-click-add-discounts-dialog')}>
              <Icon font='Feather' name='plus' color={ACCENT_COLOR} size='3vh' />
            </Button>
          </View>
        </View>
        <DiscountList
          discounts={discounts}
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
