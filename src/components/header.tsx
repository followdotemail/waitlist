import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* badge */}
      <motion.div variants={itemVariants}>
        <div
          className={cn(
            "group rounded-full border border-black/10 bg-neutral-50 text-base text-white transition-all hover:cursor-pointer hover:bg-neutral-100 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 w-fit mx-auto"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-3 py-1 text-xs transition ease-out hover:text-neutral-600 hover:duration-300 sm:text-sm hover:dark:text-neutral-400">
            <span className="inline"></span> Waitlist v1 · Coming Soon
            <ArrowRightIcon className="ml-1 h-3 w-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </motion.div>

      <motion.img
        src="/logo.svg"
        alt="logo"
        className="mx-auto h-10 w-10 my-4"
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="Deliver smarter emails with AI precision"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[27rem] pt-1.5 text-center text-base text-zinc-300 sm:text-lg"
          text="Join the waitlist to get early access of the product and recieve updates on the progress!"
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
