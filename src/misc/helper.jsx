export function getNameInitials(name) {
  // console.log('Input name:', name);

  const splitName = name.toUpperCase().split(' ');
  // console.log('Split name:', splitName);

  if (splitName.length > 1) {
    // console.log('Initials:', splitName[0][0] + splitName[1][0]);
    return splitName[0][0] + splitName[1][0];
  }

  // console.log('Initials:', splitName[0][0]);
  return splitName[0][0];
}
