export const ChartDateSelect = () => {
  return (
    <select className="border border-gray-200 rounded-md shadow-sm p-2" name="chartDate" id="chartDate">
        <option value="date">dias</option>
        <option value="month">meses</option>
        <option value="year">años</option>
    </select>
  )
}
