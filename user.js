var arr = []
function addData(id,name,room)
{
  const user = { id, name, room };
    arr.push(user);
    return user;
}
function userLeave(id) {
    const index = arr.findIndex(user => user.id === id);  
    console.log(index)
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

function getUsers(room) {
  return arr.filter(user => user.room === room);
}
  
function getCurrentUser(id) {
  return arr.find(user => user.id === id);
}
  module.exports = {
    addData,
    userLeave,
    getUsers,
    getCurrentUser
  };
  