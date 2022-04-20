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
getPollList(user_address)  
返回两个列表:用户自己创建的poll和参与投票的poll  
CreatedPollList每一行需要包含poll_id, deceiption, status(投票是否截止)  
AttendedPollList每一行需要包含poll_id, deceiption, voted(是否投过了), status(投票是否截止)  


