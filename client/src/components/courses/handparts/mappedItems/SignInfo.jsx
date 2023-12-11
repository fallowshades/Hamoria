import Wrapper from '../../../../assets/wrappers/handparts/SignInfo'

const SignInfo = ({ icon, text }) => {
  if (text)
    return (
      <Wrapper>
        <span className="sign-icon">{icon}</span>
        <span className="sign-text">{text}</span>
      </Wrapper>
    )
}

export default SignInfo
