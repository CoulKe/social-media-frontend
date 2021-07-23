import styled from "styled-components";
import colors from "../../styles/variables";

const Profile = styled.main`
  display: block;
  background: #fff;
  h1 {
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    padding: 8px;
  }
  .image-text{
    max-width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 130px;
    background: aliceblue;
    border: 17px solid ${colors.pink};
    border-radius: 50%;
    margin: auto;
  }
  .save-bio{
    background: ${colors.pink};
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
    border: none;
  }
  .edit-button{
    color: blue;
    font-weight: bold;
    background: transparent;
    border: none;
  }
  #bio {
    text-align: center;
  }
  img {
    object-fit: cover;
    width: 100%;
    max-width: 500px;
    height: auto;
    max-height: 300px;
    margin: auto;
    display: block;
  }
  #details {
    font-weight: bold;
    font-size: 1rem;
  }
  .name {
    font-weight: bold;
    display: inline-block;
    margin: 0px 0px 4px 0px;
  }
  .post {
    margin-bottom: 4px;
  }
  #pinned {
    margin-bottom: 16px;
    h1 {
      font-size: 16px;
      text-align: left;
      padding: 4px 0px 0px 0px;
    }
  }
  #pinned,
  #posts {
    padding: 0px 2px;
  }
`;

export const FollowsWrapper = styled.div`
 a{
   color: #212529;
 }
`
export const ProfileCta = styled.div`
a:hover{
  text-decoration: none;
}
 a, button{
   width: fit-content;
   color: #fff;
   padding: 8px;
   margin: 8px;
 }
`
export default Profile;
