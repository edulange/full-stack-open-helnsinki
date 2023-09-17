import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
	title: "Teste",
	author: "Dudu",
	url: "www.teste.com.br",
	likes: 5,
};


test("Testando se renderiza o blog", () => {
	const { container } = render(<Blog blog={blog} />);
	const element = container.querySelector(".blog");

	//const element = screen.getByText('Teste', { exact: false})
	expect(element).toHaveTextContent("Teste");
	expect(element).toHaveTextContent("Dudu");
	expect(element).not.toHaveTextContent("www.teste.com.br");
	expect(element).not.toHaveValue(5);
});

test("Verificar se o botão 'view' foi clicado", async () => {
  // Renderiza o componente
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText("view")

  // Espie a função userEvent.click
  const clickSpy = jest.spyOn(user, "click")

  // Clica no botão "view"
  await user.click(button)

  // Verifique se a função userEvent.click foi chamada com o botão como argumento
  expect(clickSpy).toHaveBeenCalledWith(button)

  // Limpe a espionagem
  clickSpy.mockRestore()
});

test("Testadno se o o URL e o número de likes é mostrado quando clicado em View", async () => {
	const { container } = render(<Blog blog={blog} />);
	const element = container.querySelector(".blog");


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(element).toHaveTextContent("www.teste.com.br");
  expect(element).toHaveTextContent('Likes 5')
});
