type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span className={className}>
      OperateA
      <span className="inline-block rotate-180 text-[#a0ffdf]">i</span>
    </span>
  );
}
