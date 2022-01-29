import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

import {CircleSnail} from 'components';
import {BACKGROUND_COLOR2} from 'constants/colors';
import {hp} from 'utils/helper';

import styles from './.module.css';
import Formatter from 'utils/Formatter';

export default function ButtonGenerate({
  filterDate,
  dataSet,
  isLoading,
  reportType,
  element,
}) {
  const getComponent = () => {
    if (isLoading) {
      return (
        <button className={styles.button} disabled={true}>
          <CircleSnail size={hp(3.25)} thickness={hp(0.5)} color={BACKGROUND_COLOR2} />
        </button>
      );
    }
    return (
      <ExcelFile
        filename={`${reportType} (${Formatter.toLocaleString(
          filterDate.min,
        )} - ${Formatter.toLocaleString(filterDate.max.toLocaleDateString())})`}
        element={element}>
        <ExcelSheet dataSet={dataSet} name='sheet 1' />
      </ExcelFile>
    );
  };

  if (reportType === 'Sales Report') {
    return getComponent(isLoading, dataSet);
  }
  if (reportType === 'Products Report') {
    return getComponent(isLoading, dataSet);
  }
  if (reportType === 'Restock Report') {
    return getComponent(isLoading, dataSet);
  }
  return <></>;
}
