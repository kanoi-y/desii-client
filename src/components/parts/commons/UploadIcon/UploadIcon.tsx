import { Avatar, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ChangeEvent, VFC } from 'react'
import { GuestUserIcon } from '~/components/domains/user/UserIcon'
import { SolidIcon, Text } from '~/components/parts/commons'

type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'full'

type Props = {
  onSelectImage: (file: ChangeEvent<HTMLInputElement>) => void
  currentImagePath?: string
  size?: sizeType
  disabled?: boolean
}

export const UploadIcon: VFC<Props> = ({
  onSelectImage,
  currentImagePath,
  size = 'md',
  disabled = false,
}) => {
  return (
    <StyledLabel htmlFor="image" aria-disabled={disabled}>
      {currentImagePath ? (
        <Avatar size={size} src={currentImagePath} />
      ) : (
        <GuestUserIcon size={size} />
      )}
      {!disabled && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="8px"
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex="1"
          backgroundColor="rgb(92 92 92 / 70%)"
          borderRadius="50%"
          opacity="0"
          transition="opacity 0.3s"
          cursor="pointer"
          _hover={{ opacity: 1 }}
        >
          <SolidIcon icon="SOLID_PHOTOGRAPH" size={20} />
          <Text color="white.main" fontSize="sm">
            写真を変更
          </Text>
        </Box>
      )}
      <Box display="none">
        <input
          type="file"
          name="image"
          id="image"
          onChange={onSelectImage}
          accept="image/*"
          disabled={disabled}
        />
      </Box>
    </StyledLabel>
  )
}

const StyledLabel = styled('label')`
  position: relative;
`
