import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // Base styles shared by all variants
  [
    "inline-flex items-center justify-center",
    "rounded-md border border-transparent text-center leading-5 no-underline",
    "cursor-pointer transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        secondary:
          "bg-gradient-to-r from-primary from-25% to-primary-btn-gradient text-white hover:opacity-90",
        outline:
          "border-primary bg-transparent text-primary hover:bg-primary/5",
        ghost: "bg-transparent text-primary hover:bg-primary/5",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// Props when rendering as a link (<a>)
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariantProps & {
    href: string;
  };

// Props when rendering as a button (<button>)
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    href?: never;
  };

type ButtonProps = AnchorProps | ButtonElementProps;

function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    return <a className={classes} {...(props as AnchorProps)} />;
  }

  return <button className={classes} {...(props as ButtonElementProps)} />;
}

export { Button, buttonVariants, type ButtonProps };
