import styled from "styled-components"

export const Container = styled.div`
  .profile-picture{
    width:100px;
    margin-right: 10px;
  }
  .profile-header{
    margin: 10px 0 20px;
    display:flex;
    align-items:center;
  }
  .profile-buttons{
    display:flex;
    align-items: center;
    justify-content: flex-end;

    button{
      margin-left:5px;
    }
  }
  .header{
    display:flex;
    align-items:center;
    justify-content: space-between;
  }
`