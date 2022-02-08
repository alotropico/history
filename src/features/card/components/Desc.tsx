import style from '../style/Desc.module.scss'

export default function Desc({ desc, source, sourceLink }) {
  const renderDesc = desc && parseDesc(desc)

  return desc ? (
    <div className={style.body}>
      {renderDesc}

      {(sourceLink || source) && (
        <div className={style.source}>
          {sourceLink ? (
            <a href={sourceLink} target='_blank' rel='noreferrer'>
              {source || 'Source'}
            </a>
          ) : (
            source
          )}
        </div>
      )}
    </div>
  ) : null
}

// Split text by dots and display every chunk in a paragraph
const parseDesc = (desc) =>
  desc
    .replaceAll('. ', '. \n')
    .split(/(\r?\n+)/gi)
    .map((p, j) => <p key={j}>{p}</p>)
