import {ChartDate} from '../../types/chartDate';

type Props = {
    onChangeDate: React.Dispatch<React.SetStateAction<string>>
}

export const ChartDateSelect = ({onChangeDate}: Props) => {
  return (
    <select onChange={(e) => onChangeDate(e.target.value)} className="border border-gray-200 rounded-md shadow-sm p-2" name="chartDate" id="chartDate">
        <option value="date">dias</option>
        <option value="month">meses</option>
        <option value="year">años</option>
    </select>
  )
}
