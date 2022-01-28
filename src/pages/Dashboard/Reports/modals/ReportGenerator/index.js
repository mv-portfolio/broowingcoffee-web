import {useEffect, useReducer, useState} from 'react';
import {Dropdown, DatePicker, Separator, Text, View, CircleSnail} from 'components';
import {generateReports as reducerGenerateReport, generateReportsInitState} from 'hooks';
import ReactExport from 'react-data-export';
import {server} from 'network/service';

import restockReport from './strategies/restockReport';
import salesReport from './strategies/salesReport';
import styles from './.module.css';
import {connect} from 'react-redux';
import ButtonGenerate from '../../components/ButtonGenerate';
import {SET_ERROR} from 'ducks/actions';
import {hp} from 'utils/helper';
import {BACKGROUND_COLOR2} from 'constants/colors';

function ReportGenerator({auth, dispatch, onGenerate}) {
  const [state, setState] = useReducer(reducerGenerateReport, generateReportsInitState);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const multiDataSet = [
    {
      columns: [
        {title: 'Headings', width: {wpx: 80}}, //pixels width
        {title: 'Text Style', width: {wch: 40}}, //char width
        {title: 'Colors', width: {wpx: 90}},
      ],
      data: [
        [
          {value: 'H1', style: {font: {sz: '24', bold: true}}},
          {value: 'Bold', style: {font: {bold: true}}},
          {
            value: 'Red',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FFFF0000'}}},
          },
        ],
        [
          {value: 'H2', style: {font: {sz: '18', bold: true}}},
          {value: 'underline', style: {font: {underline: true}}},
          {
            value: 'Blue',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FF0000FF'}}},
          },
        ],
        [
          {value: 'H3', style: {font: {sz: '14', bold: true}}},
          {value: 'italic', style: {font: {italic: true}}},
          {
            value: 'Green',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FF00FF00'}}},
          },
        ],
        [
          {value: 'H4', style: {font: {sz: '12', bold: true}}},
          {value: 'strike', style: {font: {strike: true}}},
          {
            value: 'Orange',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FFF86B00'}}},
          },
        ],
        [
          {value: 'H5', style: {font: {sz: '10.5', bold: true}}},
          {value: 'outline', style: {font: {outline: true}}},
          {
            value: 'Yellow',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FFFFFF00'}}},
          },
        ],
        [
          {value: 'H6', style: {font: {sz: '7.5', bold: true}}},
          {value: 'shadow', style: {font: {shadow: true}}},
          {
            value: 'Light Blue',
            style: {fill: {patternType: 'solid', fgColor: {rgb: 'FFCCEEFF'}}},
          },
        ],
      ],
    },
  ];

  const onClick = (actionType, value) => {
    if (actionType === 'on-select-date-start') {
      setState({type: 'set', filter_date: {...state.filter_date, min: value}});
      return;
    }
    if (actionType === 'on-select-date-end') {
      setState({type: 'set', filter_date: {...state.filter_date, max: value}});
      return;
    }
    if (actionType === 'on-select-type-report') {
      setState({type: 'set', type_report: value});
      return;
    }
  };

  const getDataSet = (state, data) => {
    const {filter_date, type_report} = state;
    if (type_report === 'Sales Report') {
      return salesReport(filter_date, data);
    }
  };

  const initListener = async () => {
    setLoading(true);
    try {
      const {primary_auth_token, secondary_auth_token} = auth;
      const {min, max} = state.filter_date;
      const {res} = await server.peek('/reports', {
        headers: {
          'primary-auth-token': primary_auth_token,
          'secondary-auth-token': secondary_auth_token,
        },
        params: {
          date: {
            min: new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime(),
            max: new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime(),
          },
        },
      });
      setData(res);
    } catch (err) {
      if (!err.includes('jwt')) {
        console.log('PEEK-REPORTS-REJECT', err);
        dispatch(SET_ERROR({report: err}));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(initListener, [state]);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>GENERATE REPORT</Text>
      <Separator vertical={1} />
      <View style={styles.bodyPane}>
        <Separator vertical={0.5} />
        <View style={styles.datepickersPane}>
          <View style={styles.datepickerPane}>
            <Text style={styles.label}>Start Date</Text>
            <Separator vertical={0.5} />
            <DatePicker
              style={styles.datepicker}
              formatType='standard'
              date={state.filter_date.min}
              onSelectedDate={date => onClick('on-select-date-start', date)}
            />
          </View>
          <Separator horizontal={1} />
          <View style={styles.datepickerPane}>
            <Text style={styles.label}>End Date</Text>
            <Separator vertical={0.5} />
            <DatePicker
              style={styles.datepicker}
              formatType='standard'
              date={state.filter_date.max}
              onSelectedDate={date => onClick('on-select-date-end', date)}
            />
          </View>
        </View>
        <Separator vertical={1} />
        <Text style={styles.label}>Type of Report</Text>
        <Separator vertical={0.5} />
        <Dropdown
          style={styles.dropdown}
          items={[
            'Sales Report',
            'Products Report',
            'Restock Report',
            'e-Receipt Report',
          ]}
          onSelected={selected => onClick('on-select-type-report', selected)}
        />
      </View>
      <Separator vertical={2} />
      <View style={styles.bottomPane}>
        <ButtonGenerate
          isLoading={isLoading}
          reportType={state.type_report}
          dataSet={getDataSet(state, data)}
          element={
            <button className={styles.button} onClick={onGenerate}>
              GENERATE
            </button>
          }
          onGenerate={onGenerate}
        />
      </View>
    </View>
  );
}

const stateProps = ({auth}) => ({auth});
const dispatchProps = dispatch => ({dispatch: action => dispatch(action)});
export default connect(stateProps, dispatchProps)(ReportGenerator);
