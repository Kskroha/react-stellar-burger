import { FC, ReactElement } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from '../../services/reducers';

interface IProtected {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected: FC<IProtected> = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: ReactElement}) => (
  <Protected onlyUnAuth={true} component={component} />
);
