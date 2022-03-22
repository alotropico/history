import style from '../style/Desc.module.scss'

export default function Desc({ desc, image }) {
  const renderDesc = desc && parseDesc(desc)

  return desc ? (
    <div className={style.body}>
      {image && (
        <a href={wikimediaLargeImage(image)} target='_blank' rel='noreferrer'>
          <img src={image} />
        </a>
      )}
      {renderDesc}
    </div>
  ) : null
}

const wikimediaLargeImage = (small) => {
  const [lastSlug] = small.split('/').slice(-1)
  const file = lastSlug.slice(lastSlug.indexOf('-') + 1)
  return 'https://commons.wikimedia.org/wiki/File:' + file
}

// Split text by dots and display every chunk in a paragraph
const parseDesc = (desc) => desc
/*   desc
    .replaceAll('. ', '. \n')
    .split(/(\r?\n+)/gi)
    .map((p, j) => <p key={j}>{p}</p>) */
