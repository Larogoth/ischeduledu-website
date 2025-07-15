

const TrustSection = () => {
  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-foreground/70 font-medium">Trusted by educators across the country</p>
        </div>
        
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">161</div>
            <div className="text-sm text-foreground/70">Downloads</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">5.0★</div>
            <div className="text-sm text-foreground/70">App Store Rating</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">100%</div>
            <div className="text-sm text-foreground/70">Teacher Built</div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-foreground/60 text-sm">
            Built by a teacher for teachers worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

