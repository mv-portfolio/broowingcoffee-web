import {useContext, useEffect, useState} from 'react';
import {View, Button, Icon, SearchField, Dialog, SecondaryDialog} from 'components';
import {accentColor, accentColor2} from 'constants/styles';
import {connect} from 'react-redux';
import {PrimaryDialog, Toast} from 'context';
import ItemList from './components/ItemList';
import styles from './.module.css';
import Restock from './modals/Restock';
import Item from './modals/Item';
import {
  CLEAR_ERROR,
  POP_INVENTORY,
  POP_INVENTORY_REQ,
  PUSH_INVENTORY,
  SET_INDEX_INVENTORY,
  SET_RESTOCK_INVENTORY,
} from 'modules/actions';

function Inventory({inventory: reduxInventory, error, dispatch}) {
  const {onShow: onShowPrimaryDialog, onHide: onHidePrimaryDialog} =
    useContext(PrimaryDialog);
  const {onShow: onShowToast} = useContext(Toast);

  const [inventory, setInventory] = useState(reduxInventory.items || []);
  const [search, setSearch] = useState('');

  const onSearch = value => {
    let filtered = [];
    if (value.length !== 0) {
      filtered = inventory.filter(product => product.name.includes(value));
      setInventory(filtered);
      return;
    }
    setInventory(reduxInventory.items);
  };
  const onShowDialog = ({type, productInfo, onAdd, onUpdate, onDelete}) => {
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

  const onClick = (actionType, value) => {
    //show-dialog
    if (actionType === 'on-click-add-dialog') {
      onShowDialog({type: 'add', onAdd: item => onClick('on-click-added-item', item)});
      return;
    }
    if (actionType === 'on-click-edit-dialog') {
      onShowDialog({
        type: 'edit',
        productInfo: value,
        //onEdit: item => onClick('on-click-edit-dialog', item),
        onUpdate: item => onClick('on-click-update-item', item),
        onDelete: item => onClick('on-click-delete-dialog', item),
      });
      return;
    }
    if (actionType === 'on-click-restock-dialog') {
      onShowPrimaryDialog(
        <Restock
          productInfo={value}
          onRestock={item => onClick('on-click-restock-item', item)}
          onCancel={onHidePrimaryDialog}
        />,
      );
    }
    if (actionType === 'on-click-delete-dialog') {
      onShowConditionalDeleteDialog({
        title: 'Delete',
        content: `Do you want to delete ${value}?`,
        value,
      });
      return;
    }

    //CRUD
    if (actionType === 'on-click-added-item') {
      dispatch(PUSH_INVENTORY({item: value}));
      return;
    }
    if (actionType === 'on-click-update-item') {
      dispatch(SET_INDEX_INVENTORY({item: value}));
      return;
    }
    if (actionType === 'on-click-restock-item') {
      dispatch(SET_RESTOCK_INVENTORY({item: value}));
    }

    //dialog
    if (actionType === 'on-click-delete-dialog-positive') {
      dispatch(POP_INVENTORY_REQ({itemId: value}));
      onHidePrimaryDialog();
    }
  };
  const onChange = (actionType, value) => {
    if (actionType === 'on-change-search') {
      setSearch(value);
      onSearch(value);
    }
  };

  const onShowConditionalDeleteDialog = ({title, content, value}) => {
    onShowPrimaryDialog(
      <Dialog
        title={title}
        content={content}
        positiveText='Delete'
        positiveButtonStyle={{backgroundColor2: accentColor2}}
        onClickPositive={() => onClick('on-click-delete-dialog-positive', value)}
        negativeText='No'
        onClickNegative={onHidePrimaryDialog}
      />,
    );
  };

  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Inventory';
    setInventory(reduxInventory.items);
  };
  const errorListener = () => {
    if (error.inventory) {
      onShowToast(error.inventory, 4000, () => {
        dispatch(CLEAR_ERROR());
      });
    }
  };
  useEffect(screenInitListener, [reduxInventory]);
  useEffect(errorListener, [error]);

  return (
    <View style={styles.mainPane}>
      <View style={styles.bodyPane}>
        <View style={styles.headerBodyPane}>
          <SearchField
            value={search}
            onChangeText={text => onChange('on-change-search', text)}
          />
          <Button skin={styles.buttonAdd} onPress={() => onClick('on-click-add-dialog')}>
            <Icon font='Feather' name='plus' color={accentColor} size='3vh' />
          </Button>
        </View>
        <ItemList
          items={inventory}
          onEdit={item => onClick('on-click-edit-dialog', item)}
          onRestock={item => onClick('on-click-restock-dialog', item)}
        />
      </View>
    </View>
  );
}

const stateProps = ({inventory, error}) => ({
  inventory,
  error,
});

const dispatchProps = dispatch => ({
  dispatch: action => dispatch(action),
});

export default connect(stateProps, dispatchProps)(Inventory);
