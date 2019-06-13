const icon = (monthlyInstall, amount, balance) => {
  let color; let iconName;
  console.log(+balance === 0);
  if (monthlyInstall <= amount && +balance !== 0) {
    color = '-fc-green-1';
    iconName = 'lens';
  } else if (monthlyInstall >= amount && +balance !== 0) {
    color = '-fc-amber-1';
    iconName = 'lens';
  } else if (+balance === 0) {
    color = '-fc-green-1';
    iconName = 'hourglass_full';
  }
  return `<td class="res-td-4"><i
class="material-icons ${color} -fs-res-l-2 -fs-res-m-3 -fs-res-sm-4">${iconName}</i>
</td>`;
};
export default icon;
