import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

import {CircleSnail} from 'components';
import {BACKGROUND_COLOR2} from 'constants/colors';
import {hp} from 'utils/helper';

import styles from './.module.css';

export default function ButtonGenerate({
  dataSet,
  isLoading,
  reportType,
  element,
  onGenerate,
}) {
  if (reportType === 'Sales Report') {
    if (isLoading) {
      console.log('loading!');
      return (
        <button className={styles.button}>
          <CircleSnail size={hp(3.25)} thickness={hp(0.5)} color={BACKGROUND_COLOR2} />
        </button>
      );
    }
    return (
      <ExcelFile filename={reportType} element={element}>
        <ExcelSheet dataSet={dataSet} name='sheet 1' />
      </ExcelFile>
    );
  }
  return <></>;
}
