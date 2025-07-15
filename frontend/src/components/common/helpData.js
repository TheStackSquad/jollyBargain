import {
  Book,
  CreditCard,
  Truck,
  Shield,
  User,
  MessageCircle,
  ExternalLink,
  Clock,
} from "lucide-react";

export const helpCategoriesData = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Learn the basics of using Jolly Bargain",
    articles: [
      {
        title: "How to create an account",
        url: "/help/getting-started/create-account",
        popular: true,
      },
      {
        title: "Setting up your profile",
        url: "/help/getting-started/setup-profile",
        popular: false,
      },
      {
        title: "Understanding Jolly Bargain",
        url: "/help/getting-started/understanding-platform",
        popular: true,
      },
      {
        title: "Mobile app setup guide",
        url: "/help/getting-started/mobile-app",
        popular: false,
      },
      {
        title: "First time buyer guide",
        url: "/help/getting-started/first-time-buyer",
        popular: true,
      },
    ],
  },
  {
    id: "orders-payment",
    title: "Orders & Payment",
    icon: CreditCard,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Everything about placing orders and payments",
    articles: [
      {
        title: "How to place an order",
        url: "/help/orders-payment/place-order",
        popular: true,
      },
      {
        title: "Payment methods accepted",
        url: "/help/orders-payment/payment-methods",
        popular: true,
      },
      {
        title: "Order modifications",
        url: "/help/orders-payment/modify-order",
        popular: false,
      },
      {
        title: "Refund process",
        url: "/help/orders-payment/refund-process",
        popular: true,
      },
      {
        title: "Order cancellation",
        url: "/help/orders-payment/cancel-order",
        popular: false,
      },
    ],
  },
  {
    id: "shipping-delivery",
    title: "Shipping & Delivery",
    icon: Truck,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Track orders and understand delivery options",
    articles: [
      {
        title: "Delivery timeframes",
        url: "/help/shipping-delivery/delivery-timeframes",
        popular: true,
      },
      {
        title: "Shipping costs",
        url: "/help/shipping-delivery/shipping-costs",
        popular: false,
      },
      {
        title: "Track your order",
        url: "/help/shipping-delivery/track-order",
        popular: true,
      },
      {
        title: "Delivery issues",
        url: "/help/shipping-delivery/delivery-issues",
        popular: true,
      },
      {
        title: "Express delivery options",
        url: "/help/shipping-delivery/express-delivery",
        popular: false,
      },
    ],
  },
  {
    id: "security-privacy",
    title: "Security & Privacy",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Keep your account safe and secure",
    articles: [
      {
        title: "Account security",
        url: "/help/security-privacy/account-security",
        popular: true,
      },
      {
        title: "Privacy policy",
        url: "/help/security-privacy/privacy-policy",
        popular: false,
      },
      {
        title: "Data protection",
        url: "/help/security-privacy/data-protection",
        popular: false,
      },
      {
        title: "Safe shopping tips",
        url: "/help/security-privacy/safe-shopping",
        popular: true,
      },
      {
        title: "Two-factor authentication",
        url: "/help/security-privacy/two-factor-auth",
        popular: false,
      },
    ],
  },
  {
    id: "account-management",
    title: "Account Management",
    icon: User,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    description: "Manage your account settings and preferences",
    articles: [
      {
        title: "Update personal information",
        url: "/help/account-management/update-info",
        popular: false,
      },
      {
        title: "Change password",
        url: "/help/account-management/change-password",
        popular: true,
      },
      {
        title: "Delete account",
        url: "/help/account-management/delete-account",
        popular: false,
      },
      {
        title: "Notification settings",
        url: "/help/account-management/notifications",
        popular: false,
      },
      {
        title: "Wishlist management",
        url: "/help/account-management/wishlist",
        popular: false,
      },
    ],
  },
  {
    id: "returns-refunds",
    title: "Returns & Refunds",
    icon: Clock,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Return items and process refunds",
    articles: [
      {
        title: "Return policy",
        url: "/help/returns-refunds/return-policy",
        popular: true,
      },
      {
        title: "How to return an item",
        url: "/help/returns-refunds/how-to-return",
        popular: true,
      },
      {
        title: "Refund processing time",
        url: "/help/returns-refunds/refund-time",
        popular: true,
      },
      {
        title: "Exchange process",
        url: "/help/returns-refunds/exchange-process",
        popular: false,
      },
      {
        title: "Damaged items",
        url: "/help/returns-refunds/damaged-items",
        popular: false,
      },
    ],
  },
];

export const quickLinksData = [
  {
    title: "Contact Us",
    href: "/contact",
    icon: MessageCircle,
    color: "text-blue-600",
  },
  { title: "FAQ", href: "/faq", icon: Book, color: "text-green-600" },
  {
    title: "Return Policy",
    href: "/help/returns-refunds/return-policy",
    icon: Clock,
    color: "text-red-600",
  },
  {
    title: "Terms of Service",
    href: "/terms",
    icon: ExternalLink,
    color: "text-purple-600",
  },
];
