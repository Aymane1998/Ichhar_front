import { useAppSelector } from 'src/hooks';

const demandesListe = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const demandesListe = useAppSelector((state) => state.componements.getSlice);

  return demandesListe;
};

export default demandesListe;
