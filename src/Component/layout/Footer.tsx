export function Footer() {
  return (
    <footer className="border-t bg-card px-6 py-4 mt-auto">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>© 2024 upDate LMS. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}