import React from 'react';
import styled from 'styled-components';

const AvatarImg = styled.img`
  background-image: url(${({ img }: { img: any }) => img});
  width: 50px;
  height: 50px;
  border: 1px dashed var(--white);
  border-radius: 50%;
  margin-bottom: 15px;
`;

export const Avatar = ({ img }) => <AvatarImg img={img} />;

Avatar.defaultProps = {
  img: 'https://picsum.photos/50',
};
