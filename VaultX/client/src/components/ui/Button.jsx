const Button = ({
  onClick,
  variant = 'primary',
  label,
  icon,
  corners = 'md',
  fullWidth = false,
  isDisabled = false,
  iconPosition = 'left',
}) => {
  const baseClasses = `inline-flex items-center justify-center text-sm font-medium dark:shadow-2xl transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80 px-6 py-3`;

  const variantClasses = {
    secondary: `border border-input text-gray-600 ring-primary/70 hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus-visible:ring-2 focus-visible:ring-ring dark:border-dark-800 dark:text-gray-200 dark:ring-primary/70 dark:hover:border-dark-800 dark:hover:bg-background/50 dark:focus:ring-offset-dark-800`,
    primary: `bg-primary text-white`,
    hero: `bg-transparent from-primary to-primary-700 hover:shadow-primary/60 bg-gradient-to-r px-8 py-4 hover:to-indigo-600 text-lg lg:text-xl text-white`,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${corners && `rounded-${corners}`} ${fullWidth && 'w-full'}`;

  const placeIcon = `${iconPosition === 'left' ? 'flex-row-reverse' : ''}`;

  return (
    <button
      onClick={onClick || (() => {})}
      className={combinedClasses}
      disabled={isDisabled}
    >
      <span
        className={`flex items-center space-x-1 font-montserrat ${placeIcon}`}
      >
        <span>{label || 'label Goes Here'}</span>
        {icon && <img src={icon} alt="Icon" className="h-5 lg:h-6" />}
      </span>
    </button>
  );
};

export default Button;
