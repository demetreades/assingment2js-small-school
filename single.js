class UserStore {
  constructor(){
   if(!UserStore.instance){
     this._data = [];
     UserStore.instance = this;
   }

   return UserStore.instance;
  }
  
  add(item){
    this._data.push(item);
  }

  get(id){
    return this._data.find(d => d.id === id);
  }
}
  
const userStore = new UserStore()
const userStore2 = new UserStore()
const userStore3 = new UserStore()

userStore.add('item1')
userStore2.add('item3')
userStore3.add('item4')
userStore3.add('item6')
userStore3.add('item7')
console.log(userStore.get('item1'))
console.log(userStore.get(2))
console.log(userStore.get(3))
console.log('1:\t', userStore);
console.log('2:\t', userStore2);
console.log('3:\t', userStore3);

