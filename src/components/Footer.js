import styled from "styled-components";


const Footer = () => {
  return (
    <>
     <LinkedinFooter>
      <ul>
        <li>
          <a>
            <span style={{color: "#BC9BDE"}}>
                About
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Accessibility
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Help Center
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
              Privacy & Terms
              <img src="/images/drop-down-arrow.png" alt="" />
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Ad Choices
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Advertising
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Business Services 
            <img src="/images/drop-down-arrow.png" alt="" />
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
            Get the LinkedIn app
            </span>
          </a>
        </li>
        <li>
          <a>
            <span>
              More
            </span>
          </a>
        </li>
      </ul>
      <div className="copyrighttext">
        <img src="/images/Linkedin-footer-icon.svg" alt="" />
        LinkedIn Corporation © 2024
      </div>
     </LinkedinFooter>
    </>
  )
}

const LinkedinFooter = styled.div`
  ul{
    width: 252px;
    height: 95.9px;
    margin: 16px 24px;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    li{
      padding: 3px 8px;
      span{
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        img{
          margin-left: 4px;
          color: rgba(0, 0, 0, 0.6);
          width: 8px;
          height: 8px;
        }
        color: rgba(0, 0, 0, 0.6);
        &:hover{
          color:rgb(10, 102, 194);
          text-decoration: underline;
        }
      }
    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .copyrighttext{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    img{
      margin-right: 4px;
      width: 54px;
      height: 14px;
    }
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.9);
  }  
`;


export default Footer
