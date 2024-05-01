import { forwardRef, CSSProperties, ReactNode, Ref } from 'react';
import { Card, CardContent, CardHeader, Divider, Typography, CardProps, CardHeaderProps, CardContentProps } from '@mui/material';
import { KeyedObject } from '../../types/root';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
  fullHeight?: boolean;
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow = true,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      fullHeight = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderRadius: 1,
          borderColor: '#E5E5E5',
          boxShadow: '0 2px 14px 0 rgb(153 153 153 / 30%)',
          ':hover': {
            boxShadow: '0 4px 25px 0 rgb(0 0 0 / 40%)',
          },
          height: fullHeight ? '100%' : 'auto',
          ...(codeHighlight && {
            '& pre': {
              m: 0,
              p: '12px !important',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
            },
          }),
          ...(modal && {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc( 100% - 50px)`, sm: 'auto' },
            '& .MuiCardContent-root': {
              overflowY: 'auto',
              minHeight: 'auto',
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}
        {title && divider && <Divider />}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
