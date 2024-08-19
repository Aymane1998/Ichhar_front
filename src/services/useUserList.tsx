// userService.js
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { UserInfos } from 'src/utils/types/UserInfos';

const useUserList = () => {
  const getUserListeRequest = useAppSelector((state) => state.auth.usersListe);

  const getUsersList = () => {
    if (getUserListeRequest.status === ReduxStatus.Succeeded) {
      return getUserListeRequest.data.map((user: UserInfos) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: '',
        supervised_service: {
          id: 0,
          nom_service: '',
          pole: '',
          entite: '',
          manager: 0,
        },
      }));
    }

    // Return an empty array or handle other cases as needed
    return [];
  };

  return {
    loading: getUserListeRequest.status === ReduxStatus.Loading,
    users: getUsersList(),
  };
};

export default useUserList;
