const SectionTitle = ({ text, AddclassName, link }) => {
  const combinedClassName = `text-3xl font-medium tracking-wider capitalize ${
    AddclassName || ''
  }`
  return (
    <div className="border-b border-base-300 pb-5">
      {link ? (
        <a className={`${combinedClassName} underline`} href={text}>
          {text}
        </a>
      ) : (
        <h2 className={combinedClassName}>{text}</h2>
      )}
    </div>
  )
}
export default SectionTitle
