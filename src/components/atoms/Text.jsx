const Text = ({ 
  variant = 'body', 
  size = 'base', 
  weight = 'normal',
  color = 'gray-900',
  className = '', 
  children,
  ...props 
}) => {
  const variants = {
    display: 'font-display',
    heading: 'font-heading',
    body: 'font-sans'
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const textColor = color.startsWith('text-') ? color : `text-${color}`;

  const classes = `${variants[variant]} ${sizes[size]} ${weights[weight]} ${textColor} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Text;