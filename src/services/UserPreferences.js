// UserPreferences 관리 (LocalStorage 연동): 지연 초기화하는 방식
export const UserPreferences = (() => {
  const getPreferences = () => JSON.parse(localStorage.getItem('user')) || {};

  return {
    get preferences() {
      return getPreferences(); // getter 호출 시 데이터 로딩
    },
    set(data) {
      localStorage.setItem('user', JSON.stringify(data));
    },
    delete() {
      localStorage.removeItem('user');
    },
  };
})();
