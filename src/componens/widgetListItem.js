import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: row
    align-items: flex-start;
    justify-content: flex-start;
`;

export const WidgetsListItem = (props) => {

  const onItemClick = () => {
     props.updateCurrentIndex(props.data.id)
  }
  
  return (
    <Container className='widgets-list-item'>
        <li className='list-group-item list-group-item-action'onClick={() => onItemClick()} style={{display:"flex"}}>
          <span style={{cursor:"pointer"}}>{props.data.name}</span>
        </li>
    </Container>
  )
}
