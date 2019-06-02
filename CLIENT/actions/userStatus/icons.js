import imgicon from '../../assets/images/70.png';

const iconsBuilder = ({
  userid, email, status, img,
}) => {
  const imgPath = img === undefined ? imgicon : img;
  const verifyIconColor = status === 'verified' ? '-fc-green' : '-fc-gray-1';
  const unVerifyIconColor = status === 'unverified' ? '-fc-amber-1' : '-fc-gray-1';
  return ` 
<td class="res-td-5"><i id="verify-${userid}" onclick="modifyUserStatus('${email}', 'verified')" class="material-icons  verify-user-checkbox btn-pointer -fs-res-l-1 -fs-res-m-2 -fs-res-sm-4 verify ${verifyIconColor}">verified_user</i></td>
<td class="res-td-5"><i id="unverify-${userid}" onclick="modifyUserStatus('${email}', 'unverified')" class="material-icons ${unVerifyIconColor} unverify-user-checkbox btn-pointer -fs-res-l-1 -fs-res-m-2 -fs-res-sm-4 unverify">verified_user</i></td>
<td class="res-td-5"><span data-id=${userid}
    onclick = "displayUserDetails(${userid})" class="picture-icon"><img src="${imgPath}"/></span></td>
`;
};

export default iconsBuilder;
