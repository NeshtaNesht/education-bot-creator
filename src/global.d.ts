declare module 'react-vk';
declare module VK {
  class Auth {
    static login(callback: function, settings?: number): void;
    static logout(callback: function): void;
    static revokeGrants(callback: function): void;
    static getSession(callback: function): void;
  }
  class Api {
    static call(method: string, params: object, callback: function): void;
  }
  init();
}
