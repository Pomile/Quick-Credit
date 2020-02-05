import imgicon from '../../assets/images/70.png';

const iconsBuilder = ({
  id, email, status, image,
}) => {
  const imgPath = image === null ? imgicon : image;
  const verifyIconColor = status === 'verified' ? '-fc-green' : '-fc-gray-1';
  const unVerifyIconColor = status === 'unverified' ? '-fc-amber-1' : '-fc-gray-1';
  return ` 
<td class="res-td-5"><i id="verify-${email}" onclick="modifyUserStatus('${email}', 'verified')" class="material-icons  verify-user-checkbox btn-pointer -fs-res-l-1 -fs-res-m-2 -fs-res-sm-4 verify ${verifyIconColor}">verified_user</i></td>
<td class="res-td-5"><i id="unverify-${email}" onclick="modifyUserStatus('${email}', 'unverified')" class="material-icons ${unVerifyIconColor} unverify-user-checkbox btn-pointer -fs-res-l-1 -fs-res-m-2 -fs-res-sm-4 unverify">verified_user</i></td>
<td class="res-td-5"><span data-id=${id}
    onclick = "userDetails(${id})" class="picture-icon"><img src="${imgPath}"/></span></td>
`;
};

export default iconsBuilder;
