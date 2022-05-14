export default class Poll{
    static questionCreated = (res) => {
        localStorage.setItem("id", "005");
        localStorage.setItem("question", res);
    };
      
      static getState = () => {
        const id = localStorage.getItem("id");
        return !!id;
      };
      
      static getQuestion = () => {
        return localStorage.getItem("question");
      };

      static setRegister = () => {
        localStorage.setItem("register", "true");
      }

      static ifRegistered = () => {
        return !!localStorage.getItem("register");
      }
       
      
}