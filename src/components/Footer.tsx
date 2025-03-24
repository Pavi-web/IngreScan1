
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">IS</span>
              </div>
              <span className="font-display font-bold text-xl">IngreScan</span>
            </Link>
            <p className="text-muted-foreground">
              Decode your skincare products. Make informed choices for healthier skin.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/ingredients" className="text-muted-foreground hover:text-primary transition-colors">Ingredients</Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/consult" className="text-muted-foreground hover:text-primary transition-colors">Consultation</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/skin-types" className="text-muted-foreground hover:text-primary transition-colors">Skin Types Guide</Link>
              </li>
              <li>
                <Link to="/ingredients-library" className="text-muted-foreground hover:text-primary transition-colors">Ingredients Library</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-base mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-muted-foreground" />
                <a href="mailto:support@ingrescan.com" className="text-muted-foreground hover:text-primary transition-colors">support@ingrescan.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-muted-foreground" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} IngreScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
