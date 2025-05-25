interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  color = '#3498db',
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: '16px',
    medium: '32px',
    large: '48px',
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div className="spinner-container">
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
