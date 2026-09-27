const labels: Record<string, string> = {
  "Personal Project": "개인 프로젝트",
  NEOWIZ: "NEOWIZ",
  Trumpia: "Trumpia",
};

export const companyLabel = (company: string) => labels[company] ?? company;
