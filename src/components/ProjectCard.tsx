import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  link,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-xl transition-all ${
        featured
          ? 'bg-gradient-to-br from-cosmic-violet/20 to-cosmic-cyan/20 border-2 border-cosmic-violet/50'
          : 'bg-cosmic-navy/50 border border-cosmic-violet/20'
      } p-6 hover:border-cosmic-violet/80`}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-violet/0 to-cosmic-cyan/0 group-hover:from-cosmic-violet/10 group-hover:to-cosmic-cyan/10 transition-all duration-500" />

      <div className="relative z-10">
        {/* Image placeholder or actual image */}
        {image && (
          <div className="mb-4 h-48 bg-cosmic-indigo/50 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-cosmic-white mb-2 group-hover:text-cosmic-cyan transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-cosmic-white/70 mb-4 line-clamp-3">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-cosmic-violet/20 text-cosmic-cyan rounded-full border border-cosmic-violet/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-cosmic-violet hover:text-cosmic-cyan transition-colors font-semibold"
        >
          View Project
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-cosmic-violet/30 border border-cosmic-violet/50 rounded-full text-sm text-cosmic-violet font-semibold">
          Featured
        </div>
      )}
    </motion.div>
  );
}
