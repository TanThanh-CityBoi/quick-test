export const scrollToBottom = (element: any) => {
    return element?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
    });
};
