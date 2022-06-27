import { Icon as ChakraIcon } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type OutlineIconProps = {
  size?: number
  icon: keyof typeof OutlineIconMap
  color?: ColorVariables
}

type SolidIconProps = {
  size?: number
  icon: keyof typeof SolidIconMap
  color?: ColorVariables
}

const OutlineHeart: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  />
)

const OutlineBell: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  />
)

const OutlineStar: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
)

const OutlineCheck: VFC = () => (
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
)

const OutlineLogout: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  />
)

const OutlinePencilAlt: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  />
)

const OutlinePhotograph: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  />
)

const OutlineX: VFC = () => (
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
)

const OutlineUser: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  />
)

const OutlineDocumentText: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
)

const OutlineChevronDown: VFC = () => (
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
)

const OutlineTrash: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  />
)

const OutlineRefresh: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  />
)

const OutlineChat: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  />
)

const OutlinePaperAirplane: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
  />
)

const OutlineSearch: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
)

const SolidHeart: VFC = () => (
  <path
    fillRule="evenodd"
    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
    clipRule="evenodd"
  />
)

const SolidBell: VFC = () => (
  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
)

const SolidStar: VFC = () => (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
)

const SolidCheck: VFC = () => (
  <path
    fillRule="evenodd"
    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    clipRule="evenodd"
  />
)

const SolidLogout: VFC = () => (
  <path
    fillRule="evenodd"
    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
    clipRule="evenodd"
  />
)

const SolidPencilAlt: VFC = () => (
  <>
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </>
)

const SolidPhotograph: VFC = () => (
  <path
    fillRule="evenodd"
    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
    clipRule="evenodd"
  />
)

const SolidX: VFC = () => (
  <path
    fillRule="evenodd"
    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    clipRule="evenodd"
  />
)

const SolidUser: VFC = () => (
  <path
    fillRule="evenodd"
    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
    clipRule="evenodd"
  />
)

const SolidDocumentText: VFC = () => (
  <path
    fillRule="evenodd"
    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
    clipRule="evenodd"
  />
)

const SolidChevronDown: VFC = () => (
  <path
    fillRule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clipRule="evenodd"
  />
)

const SolidTrash: VFC = () => (
  <path
    fillRule="evenodd"
    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
    clipRule="evenodd"
  />
)

const SolidRefresh: VFC = () => (
  <path
    fillRule="evenodd"
    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
    clipRule="evenodd"
  />
)

const SolidChat: VFC = () => (
  <path
    fillRule="evenodd"
    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
    clipRule="evenodd"
  />
)

const SolidPaperAirplane: VFC = () => (
  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
)

const SolidSearch: VFC = () => (
  <path
    fillRule="evenodd"
    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
    clipRule="evenodd"
  />
)

export const OutlineIconMap = {
  OUTLINE_HEART: <OutlineHeart />,
  OUTLINE_BELL: <OutlineBell />,
  OUTLINE_STAR: <OutlineStar />,
  OUTLINE_CHECK: <OutlineCheck />,
  OUTLINE_LOGOUT: <OutlineLogout />,
  OUTLINE_PENCIL_ALT: <OutlinePencilAlt />,
  OUTLINE_PHOTOGRAPH: <OutlinePhotograph />,
  OUTLINE_X: <OutlineX />,
  OUTLINE_USER: <OutlineUser />,
  OUTLINE_DOCUMENT_TEXT: <OutlineDocumentText />,
  OUTLINE_CHEVRON_DOWN: <OutlineChevronDown />,
  OUTLINE_TRASH: <OutlineTrash />,
  OUTLINE_REFRESH: <OutlineRefresh />,
  OUTLINE_CHAT: <OutlineChat />,
  OUTLINE_PAPER_AIRPLANE: <OutlinePaperAirplane />,
  OUTLINE_SEARCH: <OutlineSearch />,
}

export const SolidIconMap = {
  SOLID_HEART: <SolidHeart />,
  SOLID_BELL: <SolidBell />,
  SOLID_STAR: <SolidStar />,
  SOLID_CHECK: <SolidCheck />,
  SOLID_LOGOUT: <SolidLogout />,
  SOLID_PENCIL_ALT: <SolidPencilAlt />,
  SOLID_PHOTOGRAPH: <SolidPhotograph />,
  SOLID_X: <SolidX />,
  SOLID_USER: <SolidUser />,
  SOLID_DOCUMENT_TEXT: <SolidDocumentText />,
  SOLID_CHEVRON_DOWN: <SolidChevronDown />,
  SOLID_TRASH: <SolidTrash />,
  SOLID_REFRESH: <SolidRefresh />,
  SOLID_CHAT: <SolidChat />,
  SOLID_PAPER_AIRPLANE: <SolidPaperAirplane />,
  SOLID_SEARCH: <SolidSearch />
}

export const OutlineIcon: VFC<OutlineIconProps> = ({
  icon,
  size = 24,
  color = 'text.main',
}) => {
  return (
    <ChakraIcon
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      boxSize={`${size}px`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      {OutlineIconMap[icon]}
    </ChakraIcon>
  )
}

export const SolidIcon: VFC<SolidIconProps> = ({
  icon,
  size = 24,
  color = 'text.main',
}) => {
  return (
    <ChakraIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      color={color}
      boxSize={`${size}px`}
    >
      {SolidIconMap[icon]}
    </ChakraIcon>
  )
}
