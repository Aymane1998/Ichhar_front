import { defineAbility } from '@casl/ability';
import { useAppSelector } from 'src/hooks';

export const defineUserAbilities = () => {
  const user = useAppSelector((state) => state.auth.userInfos.data);
  const userRole = user?.groups;
  const CLIENT_ROLE = 'Client';
  const ADMIN_ROLE = 'Administrator';
  const CREATOR_ROLE = 'Createur';

  return defineAbility((can: any, cannot: any) => {
    if (userRole?.includes(CLIENT_ROLE)) {
      can(
        ['read', 'update', 'edit'],
        [
          'AboutUs',
          'Contenu',
          'Createurs',
          'Payment',
          'AllFields',
          'Dashboard',
        ],
      );
      cannot('edit', ['Etat']);
    } else if (userRole?.includes(ADMIN_ROLE)) {
      can(
        ['read', 'update', 'delete'],
        ['AboutUs', 'Payment', 'Contenu', 'Createurs', 'Dashboard'],
      );
      cannot('read', ['Services', 'DataAttribut', 'Collaborateurs']);
    } else if (userRole?.includes(CREATOR_ROLE)) {
      can(
        ['read', 'update', 'delete', 'edit'],
        ['AboutUs', 'Contenu', 'Dashboard', 'Etat'],
      );
      cannot('edit', ['AllFields']);
    } else {
      can('read', ['Demands' /* , 'DataCatalog'*/]);
    }
  });
};
