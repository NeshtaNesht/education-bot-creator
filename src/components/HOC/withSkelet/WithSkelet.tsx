import { Skeleton, SkeletonProps } from '@material-ui/lab';
import React from 'react';
import { LoadingState } from 'store/types';

const WithSkelet: React.FC<SkeletonProps & { isLoading: LoadingState }> = ({
  width,
  height,
  isLoading,
  children,
}) => {
  if (isLoading === LoadingState.LOADING)
    return <Skeleton width={width} height={height} />;
  return <>{children}</>;
};

export default WithSkelet;
