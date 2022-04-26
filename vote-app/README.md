# Getting Started with Create React App


## 文件位置

在component文件夹中  
CreatePoll.js  
ViewResult.jf  
Vote.js  

### Routing
Homepage有两个列表，分别显示用户自己创建的poll和参与投票的poll  
##### 创建的poll
如果poll的投票没有结束，会显示NOT AVAILABLE，不能点进去  
如果poll的投票已经结束，会显示VIEW，点进去跳转到ViewResult  
##### 参与的poll
如果poll的投票没有结束，会显示VIEW，点进去跳转到Vote  
如果poll的投票已经结束，会显示VIEW，点进去跳转到ViewResult  
##### 创建新投票
点击button “setup new poll”跳转  
##### 参数传递
ViewResult和Vote从列表点进去我都设置了传入poll_id这个参数  


## API
##### homepage
verifyAddress(string address)
发送address
后端返回地址验证是否成功，成功后跳转主页
  
登录后主页显示三个List：createdPoll, registerPoll, votePoll; 分别是该用户发起的投票，等待该用户register的投票，以及register后可以vote的投票
getCreatedPoll(string address)
getRegisterPoll(string address)
getVotePoll(string address)
后端返回的参数包括需要包含poll_id(用于唯一识别这一个投票), deceiption, voted(该用户是否已经投过票了), status(registration，open or closed, 对应注册阶段，投票阶段，公布阶段)

verifyCreate(string address)
用户点击create new poll后验证用户是否有create的资格(持股比例超过某个值)
后端返回true or false



