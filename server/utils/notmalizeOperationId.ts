const normalizeOperationId = (operationId: string): string => {
  if (/^((No.\d{1,2})|(\d{1,2}([KT])))$/.test(operationId)) return operationId;
  return `No.${operationId}`;
};

export default normalizeOperationId;
