import { motion } from 'framer-motion';


interface TimelineItemProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
  isLast?: boolean;
  isCurrent?: boolean;
  skills?: string[];
}

export default function TimelineItem({
  title,
  subtitle,
  description,
  icon,
  index,
  isLast = false,
  isCurrent = false,
  skills = [],
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative pl-12 pb-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0">
        <div
          className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${
            isCurrent
              ? 'bg-cosmic-cyan border-cosmic-cyan'
              : 'bg-cosmic-violet border-cosmic-violet'
          }`}
        >
          {icon && <div className="text-cosmic-black text-xs">{icon}</div>}
        </div>
      </div>

      {/* Timeline line */}
      {!isLast && (
        <div
          className={`absolute left-2.5 top-8 w-0.5 h-24 ${
            isCurrent ? 'bg-cosmic-cyan' : 'bg-cosmic-violet/50'
          }`}
        />
      )}

      {/* Content */}
      <div
        className={`p-6 rounded-lg border ${
          isCurrent
            ? 'bg-cosmic-cyan/10 border-cosmic-cyan/50'
            : 'bg-cosmic-navy/50 border-cosmic-violet/20'
        } hover:border-cosmic-violet/50 transition-colors`}
      >
        <h3 className="text-xl font-bold text-cosmic-white mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-cosmic-white/60 mb-3">{subtitle}</p>
        )}
        <p className="text-cosmic-white/70 mb-4">{description}</p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-cosmic-violet/20 text-cosmic-cyan rounded border border-cosmic-violet/30"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
