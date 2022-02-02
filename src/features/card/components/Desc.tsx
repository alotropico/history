import style from '../style/Card.module.scss'

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

const parseDesc = (desc) =>
  desc
    // .replace(/\.+ /gi, '. ')
    .replaceAll('. ', '. \n')
    .split(/(\r?\n+)/gi)
    .map((p, j) => <p key={j}>{p}</p>)
