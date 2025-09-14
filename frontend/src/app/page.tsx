import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_CONFIG } from "@/utils/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {APP_CONFIG.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {APP_CONFIG.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Next.js 15
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              shadcn/ui
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Setup Completo</CardTitle>
              <CardDescription>
                Projeto configurado com as melhores práticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>✅ Next.js 15 LTS</li>
                <li>✅ TypeScript</li>
                <li>✅ Tailwind CSS v4</li>
                <li>✅ shadcn/ui</li>
                <li>✅ ESLint</li>
                <li>✅ App Router</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Componentes</CardTitle>
              <CardDescription>
                Biblioteca de componentes pronta para uso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full">Botão Padrão</Button>
                <Button variant="outline" className="w-full">
                  Botão Outline
                </Button>
                <Button variant="secondary" className="w-full">
                  Botão Secundário
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📝 Formulário</CardTitle>
              <CardDescription>
                Exemplo de formulário com shadcn/ui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Entrar</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-4">
            <Link href="/pet">
              <Button size="lg" className="flex items-center gap-2">
                <span>🐾</span>
                Gerenciar Pets
              </Button>
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Versão {APP_CONFIG.version} - Pronto para desenvolvimento!
          </p>
        </div>
      </div>
    </div>
  );
}
