import { observable, action } from "mobx";
import addMessageService from "../services/addMessage";

const message = (username, message, createdAt, isPrivate = false) =>
  observable({
    id: Math.random(),
    username,
    message,
    createdAt,
    isPrivate
  });

const messages = () =>
  observable(
    {
      list: [
        // message("pat", "this is test message", new Date(), false),
        // message("Private", "this is private test message", new Date(), true)
      ],
      addMessage(username, userMessage, createdAt, isPrivate) {
        this.list.push(message(username, userMessage, createdAt, isPrivate));
      },
      getList() {
        return this.list;
      }
    },
    {
      addMessage: action
    }
  );

const messageServerice = messages =>
  observable({
    isFetching: false,
    addMessage(message) {
      this.isFetching = true;
      addMessageService(message)
        .then(() => {
          this.isFetching = false;
        })
        .catch(() => {
          this.isFetching = false;
        });
    }
  });

const rootStore = () => {
  const messagesIns = messages();
  return {
    messages: messagesIns,
    messageService: messageServerice(messagesIns)
  };
};

export default rootStore;
